import { Head } from "fresh/runtime";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found | Be The Hero</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <img src="/logo.svg" alt="Be The Hero" className="mb-6 w-48" />
        <h1 className="text-3xl font-bold mb-2">404 - Page not found</h1>
        <p className="text-gray-600 mb-6">
          The page you were looking for doesn't exist.
        </p>
        <a href="/" className="back-link underline text-red-500 font-semibold">
          Go back home
        </a>
      </div>
    </>
  );
}
