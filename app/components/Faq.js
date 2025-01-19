const QuestionAnswer = ({ question, answer }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-darumadrop">{question}</h1>
      <h2 className="text-base">{answer}</h2>
    </div>
  );
};

const Faq = () => {
  return (
    <div className="mt-10 flex flex-col justify-around">
      <div className="font-darumadrop text-primary text-4xl font-bold mb-10">FAQ</div>
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
      <div className="mt-10">
        <h1 className="text-3xl font-darumadrop">Any issues?</h1>
        <h2 className="text-xl font-inclusiveSans">
          Feel free to contact me at @lewsworkshop on instagram!
        </h2>
      </div>
    </div>
  );
};

export default Faq;
