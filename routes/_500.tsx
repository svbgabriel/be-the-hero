import { PageProps } from "fresh";

export default function Error500Page({ error }: PageProps) {
  return (
    <div>
      <p>500 internal error: {(error as Error).message}</p>
    </div>
  );
}
