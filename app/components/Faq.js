const QuestionAnswer = ({ question, answer }) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-bold">{question}</h1>
      <h2 className="text-md">{answer}</h2>
    </div>
  );
};

const Faq = () => {
  return (
    <div className="mt-10 h-[400px] flex flex-col justify-around">
      <div className="text-3xl font-bold">FAQ</div>
      <div className="flex flex-col gap-6">
        <QuestionAnswer
          question="what’s your return and cancellation policies?"
          answer="No returns or cancellations, as these are custom ordered items :) "
        />
        <QuestionAnswer
          question="how will I get my jewelry?"
          answer="Canada Post! If you are in the Greater Vancouver area, pick up/drop off may be available. "
        />
        <QuestionAnswer
          question="what’s your refund policy?"
          answer="If the items arrive damaged, I’ll provide a full refund given proof in the form of a photo. "
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold">Any issues?</h1>
        <h2 className="text-xl">
          Feel free to contact me at @lewsworkshop on instagram!
        </h2>
      </div>
    </div>
  );
};

export default Faq;
