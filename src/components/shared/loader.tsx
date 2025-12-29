import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loader = () => {
  return (
    <div className="w-96 flex items-center justify-center">
      <DotLottieReact
        src="https://lottie.host/39672f79-33d4-49b3-b1a2-6c3eadbe3ea7/N3KyRlPLLP.lottie"
        loop
        autoplay
      />
    </div>
  );
};

export { Loader };
