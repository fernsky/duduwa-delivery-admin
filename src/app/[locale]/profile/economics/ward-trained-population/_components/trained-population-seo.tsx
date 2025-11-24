import Script from "next/script";

interface TrainedPopulationSEOProps {
  trainedPopulationData: Array<{
    id?: string;
    wardNumber: number;
    trainedPopulation: number;
  }>;
  totalTrainedPopulation: number;
  wardNumbers: number[];
}

export default function TrainedPopulationSEO({
  trainedPopulationData,
  totalTrainedPopulation,
  wardNumbers,
}: TrainedPopulationSEOProps) {
  // Create structured data for SEO
  const generateStructuredData = () => {
    // Convert trained population stats to structured data format
    const wardStats = trainedPopulationData.map((item) => ({
      "@type": "Observation",
      name: `Ward ${item.wardNumber} trained population in duduwa Rural Municipality`,
      observationDate: new Date().toISOString().split("T")[0],
      measuredProperty: {
        "@type": "PropertyValue",
        name: `Trained population in Ward ${item.wardNumber}`,
        unitText: "people",
      },
      measuredValue: item.trainedPopulation,
      description: `${item.trainedPopulation.toLocaleString()} people in Ward ${item.wardNumber} of duduwa Rural Municipality have received vocational or skills training (${((item.trainedPopulation / totalTrainedPopulation) * 100).toFixed(2)}% of total trained population)`,
    }));

    return {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: "Trained Population Distribution of duduwa Rural Municipality (डुडुवा गाउँपालिका)",
      description: `Trained population distribution data across ${wardNumbers.length} wards of duduwa Rural Municipality with a total of ${totalTrainedPopulation.toLocaleString()} trained individuals.`,
      keywords: [
        "duduwa Rural Municipality",
        "डुडुवा गाउँपालिका",
        "Trained population",
        "Skills development",
        "Vocational training",
        "Ward-wise trained data",
        "Nepal workforce development",
        "Rural skill development",
        "Economic indicators Nepal",
      ],
      url: "https://duduwa-rm.gov.np/profile/economics/ward-trained-population",
      creator: {
        "@type": "Organization",
        name: "duduwa Rural Municipality",
        url: "https://duduwa-rm.gov.np",
      },
      temporalCoverage: "2021/2023",
      spatialCoverage: {
        "@type": "Place",
        name: "duduwa Rural Municipality, Banke, Nepal",
        geo: {
          "@type": "GeoCoordinates",
          latitude: "28.1356",
          longitude: "81.6314",
        },
      },
      variableMeasured: trainedPopulationData.map((item) => ({
        "@type": "PropertyValue",
        name: `Trained population in Ward ${item.wardNumber}`,
        unitText: "people",
        value: item.trainedPopulation,
      })),
      observation: wardStats,
    };
  };

  const structuredData = generateStructuredData();

  return (
    <>
      <Script
        id="trained-population-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  );
}
