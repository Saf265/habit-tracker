import { SignUp } from "@clerk/nextjs";

export default function PageSignUp() {
  return (
    <section className="flex h-full items-center justify-center">
      <SignUp />
    </section>
  );
}
