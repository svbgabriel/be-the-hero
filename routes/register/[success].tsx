import { PageProps } from "$fresh/server.ts";

export default function RegisterSuccess(props: PageProps) {
  const { success } = props.params;

  return (
    <>
      <p>Seu ID de acesso: {success}</p>
    </>
  );
}
