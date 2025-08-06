import { createClient } from "@supabase/supabase-js";

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = path.resolve(__dirname, "../../.env.local");

dotenv.config({ path: envPath });

const DEVSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const PRODSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL_PROD,
  process.env.SUPABASE_SERVICE_ROLE_KEY_PROD
);

async function resetTable(tableName) {
  const { error } = await DEVSupabase.from(tableName).delete().neq("id", 0);

  if (error) {
    console.error(error);
  }
}

// order matters here, we need to reset the tables that reference the next
const tableNames = ["orders_beads", "orders", "beads", "customers"];

async function resetAllTables() {
  tableNames.forEach(async (tableName) => {
    await resetTable(tableName);
    console.log(`we have wiped ${tableName}! goodbye!`);
  });
}

resetAllTables();

async function getBuckets(supabaseInstance) {
  const { data, error } = await supabaseInstance.storage.listBuckets();

  if (error) {
    console.error(error);
  }

  return data;
}

async function getItem(
  bucketName,
  currentFolderName,
  item,
  bucketFiles,
  supabaseInstance
) {
  if (item.metadata && item.name !== ".emptyFolderPlaceholder") {
    const itemPath = currentFolderName
      ? `${currentFolderName}/${item.name}`
      : item.name;
    bucketFiles.push({ bucketName, itemPath });
  } else {
    await getFolder(
      bucketName,
      currentFolderName,
      item,
      bucketFiles,
      supabaseInstance
    );
  }
}

async function getFolder(
  bucketName,
  currentFolderName,
  folderItem,
  bucketFiles,
  supabaseInstance
) {
  const nextFolderName = currentFolderName
    ? `${currentFolderName}/${folderItem.name}`
    : folderItem?.name ?? "";

  const { data, error } = await supabaseInstance.storage
    .from(bucketName)
    .list(nextFolderName);

  if (error) {
    console.error(error);
  }

  for (const item of data) {
    await getItem(
      bucketName,
      nextFolderName,
      item,
      bucketFiles,
      supabaseInstance
    );
  }
}

async function getBucketFiles(supabaseInstance) {
  const bucketFiles = [];

  const buckets = await getBuckets(supabaseInstance);

  for (const bucket of buckets) {
    await getFolder(bucket.name, null, null, bucketFiles, supabaseInstance);
  }

  return bucketFiles;
}

async function clearDevBucketFiles() {
  const devFiles = await getBucketFiles(DEVSupabase);

  for (const file of devFiles) {
    const { error } = await DEVSupabase.storage
      .from(file.bucketName)
      .remove([file.itemPath]);

    if (error) {
      console.error(error);
    }

    console.log(`deleted ${file.itemPath} in ${file.bucketName}`);
  }
}

async function uploadProdBucketFiles() {
  const prodFiles = await getBucketFiles(PRODSupabase);

  for (const file of prodFiles) {
    const { data: fileBuffer, error: downloadError } =
      await PRODSupabase.storage.from(file.bucketName).download(file.itemPath);

    if (downloadError) {
      console.error(downloadError);
    }

    const { error } = await DEVSupabase.storage
      .from(file.bucketName)
      .upload(file.itemPath, fileBuffer);

    if (error) {
      console.error(error);
    }

    console.log(`uploaded ${file.itemPath} in ${file.bucketName}`);
  }
}

// bead table uploading time!!
const baseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/beads-info/images/`;

async function syncBeadsTable() {
  const { data: prodBeads, error: prodBeadsError } = await PRODSupabase.from(
    "beads"
  ).select("*");

  if (prodBeadsError) {
    console.error(prodBeadsError);
  }

  for (const bead of prodBeads) {
    const imageId = bead.image_path.split("/").pop();
    const { error } = await DEVSupabase.from("beads").insert({
      ...bead,
      image_path: `${baseUrl}${imageId}`,
    });

    if (error) {
      console.error(error);
    }

    console.log(`inserted bead ${bead.id}`);
  }
}

await clearDevBucketFiles();
await uploadProdBucketFiles();
await syncBeadsTable();
