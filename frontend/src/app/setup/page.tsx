import { SetupForm } from "@/app/setup/setupForm";

export default function Setup() {
  return (
    <div className="px-4 py-8 min-h-full h-fit grid gap-8">
      <h1 className="text-lg font-bold">プロフィール登録</h1>
      <SetupForm />
    </div>
  );
}
