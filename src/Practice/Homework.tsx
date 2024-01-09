import { useEffect, useState } from "react";

interface IBillboard {
  name: string;
  ranking: number;
  img: string;
}

const Homework = () => {
  const [songs, setSongs] = useState<IBillboard[]>([]);

  useEffect(() => {
    getHot100Songs();
  }, []);

  const getHot100Songs = async () => {
    try {
      const response = await fetch("https://billboard-charts-rankings.p.rapidapi.com/hot-100", {
        headers: {
          "X-RapidAPI-Host": "billboard-charts-rankings.p.rapidapi.com",
          "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY", // Replace with your actual RapidAPI key
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setSongs(data.songs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <h1 className="text-center">Billboard Hot 100</h1>
      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            <img src={song.img} alt={song.name} />
            <p>{song.name}</p>
            <p>Ranking: {song.ranking}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Homework;
