import { createClient } from "@supabase/supabase-js";

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = path.resolve(__dirname, "../../.env.local");

dotenv.config({ path: envPath });

const devSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const prodSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL_PROD,
  process.env.SUPABASE_SERVICE_ROLE_KEY_PROD
);

async function getTables() {
  const { data, error } = await prodSupabase.rpc("get_tables");

  if (error) {
    throw new Error("Error getting tables");
  }

  return data.map((row) => row.table_name);
}

async function getBuckets() {
  const { data, error } = await prodSupabase.storage.listBuckets();

  if (error) {
    throw new Error("Error getting buckets");
  }

  return data;
}

async function processItem(bucketName, currentFolderName, item) {
  if (item.metadata && item.name !== ".emptyFolderPlaceholder") {
    console.log(item.name);
  } else {
    await processFolder(bucketName, currentFolderName, item);
  }
}

async function processFolder(bucketName, currentFolderName, folderItem) {
  const nextFolderName = currentFolderName
    ? `${currentFolderName}/${folderItem.name}`
    : folderItem?.name ?? "";

  const { data, error } = await prodSupabase.storage
    .from(bucketName)
    .list(nextFolderName);

  if (error) {
    throw new Error("Error getting next entry");
  }

  for (const item of data) {
    await processItem(bucketName, nextFolderName, item);
  }
}

async function getBucketFiles() {
  const buckets = await getBuckets();

  for (const bucket of buckets) {
    await processFolder(bucket.name, null, null);
  }
}

getBucketFiles();
