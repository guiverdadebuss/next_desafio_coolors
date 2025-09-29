import dynamic from "next/dynamic";

const Coolors = dynamic(() => import("../components/Coolors"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Coolors />
    </div>
  );
}
