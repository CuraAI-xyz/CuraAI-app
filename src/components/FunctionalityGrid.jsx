function FunctionalityGrid() {

    const featuresData = [
  {
    id: 1,
    title: "Assist you in receiving documents",
    description: "Our agent has a feature called \"Scan my docs,\" which allows users to upload documents directly from the page. The system analyzes and extracts the text from the file for processing, summarizing, or use in other automated tasks.",
    image: "/documentsReception.jpg",
    alt: "Document reception illustration"
  },
  {
    id: 2,
    title: "Medical Asisstant 24 hours",
    description: "Our agent has a feature called \"Scan my docs,\" which allows users to upload documents directly from the page. The system analyzes and extracts the text from the file for processing, summarizing, or use in other automated tasks.", // Nota: Tenías la misma descripción en ambos, cámbiala aquí si es necesario
    image: "/docTalking.jpg",
    alt: "Medical assistant illustration"
  },
  {
    id: 2,
    title: "Medical Asisstant 24 hours",
    description: "Our agent has a feature called \"Scan my docs,\" which allows users to upload documents directly from the page. The system analyzes and extracts the text from the file for processing, summarizing, or use in other automated tasks.", // Nota: Tenías la misma descripción en ambos, cámbiala aquí si es necesario
    image: "/docTalking.jpg",
    alt: "Medical assistant illustration"
  }
];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-10/12 mx-auto mb-10">
  {featuresData.map((feature) => (
    <div
      key={feature.id}
      className="flex flex-col w-full h-full bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <h2 className="bg-[#61A5C2] p-4 w-full font-rubik font-bold text-white text-xl">
        {feature.title}
      </h2>
      <div className="flex justify-between gap-6 h-56">
        <p className="text-gray-500 pl-6 font-rubik text-sm md:text-[12px] flex-1 flex items-center">
          {feature.description}
        </p>
        <div className="w-2/5 h-full overflow-hidden shrink-0">
          <img
            src={feature.image}
            className="w-full h-full object-cover"
            alt={feature.title}
          />
        </div>
      </div>
    </div>
  ))}
</div>
  );
}
export default FunctionalityGrid;