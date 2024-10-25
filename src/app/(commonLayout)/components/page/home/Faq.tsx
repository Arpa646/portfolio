import { useState } from 'react';
import round2 from  "./round2.png"
type SliderProps = {
  darkMode: boolean; // Define darkMode as a boolean
};
const Faq: React.FC<SliderProps> = ({ darkMode }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleAccordion = (index:number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index === openIndex ? null : index);
    }
  };

  const faqItems = [
    {
      question: 'How can I contact Inkyy Team?',
      answer: 'You can reach us through our contact form on our website or by emailing us at hello@inkyy.com. We typically respond within 24 hours.',
    },
    {
      question: 'What services do you offer?',
      answer: 'We offer website design, development, and maintenance services.',
    },
    {
      question: 'Do you provide website maintenance services?',
      answer: 'Yes, we offer website maintenance services for our clients.',
    },
    {
      question: 'How long does it take to design and develop a website?',
      answer: 'The time it takes depends on the complexity and requirements of the project.',
    },
    {
      question: 'Do you require a deposit for projects?',
      answer: 'Yes, we require a deposit to start working on a project.',
    },
  ];

  return (



    <div   
    
     
    style={{
      
      backgroundImage: `url(${darkMode ? round2 : ''})`,  // Dynamically set based on mode
      backgroundPosition: " -10% ",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",


    }}>
 <div
    
   
    
    className="max-w-4xl  gap-16 mx-auto py-20 px-4 flex  lg:flex-row flex-col items-center">
      {/* Title */}




      <h2 className="   text-2xl  lg:text-4xl   lg:w-[300px] font-bold mb-8 text-sart dark:text-white">
        Frequently  Asked  Questions
      </h2>

      {/* FAQ List */}
      <div className="w-full space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="bg-white dark:bg-dark-gradient rounded-lg shadow-md">
            {/* Question */}
            <div
              className="flex justify-between items-center cursor-pointer px-4 py-4 sm:px-6 sm:py-6"
              onClick={() => toggleAccordion(index)}
            >
              <h3 className="text-lg font-bold dark:text-white">{item.question}</h3>
              <span className="text-xl dark:text-white">
                {openIndex === index ? '−' : '+'}
              </span>
            </div>

            {/* Answer (only visible if this item is open) */}
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-600 dark:text-white sm:px-6">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
   
  );
};

export default Faq;
