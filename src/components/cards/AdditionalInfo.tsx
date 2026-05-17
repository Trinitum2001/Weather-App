import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./card";
import { getWeather } from "../../api";

type Props = {};

export default function AdditionalInfo({}: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 10, lon: 25 }),
  });

  return (
    <Card title="Additional Info" childrenClassName="flex flex-col gap-8">
      {rows.map(({ label, value }) => (
        <div className="flex justify-between" key={value}>
          <span className="text-gray-500">{label}</span>
          <span>
            <FormatComponent value={value} number={data.current[value]} />
          </span>
        </div>
      ))}
    </Card>
  );
}

function FormatComponent({ value, number }: { value: string; number: number }) {
  if (value === "sunrise" || value === "sunset")
    return new Date(number * 1000).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  return number;
}

const rows = [
  {
    label: "Cloudiness (%)",
    value: "clouds",
  },
  {
    label: "UV Index",
    value: "uvi",
  },
  {
    label: "Pressure (hPa)",
    value: "pressure",
  },
  {
    label: "Wind Direction (°)",
    value: "wind_deg",
  },
  {
    label: "Sunrise",
    value: "sunrise",
  },
  {
    label: "Sunset",
    value: "sunset",
  },
] as const;
