import { SetupForm } from "@/app/setup/setupForm";
import { Title } from "@/components/shared/title";

export default function Setup() {
  return (
    <div className="px-4 py-8 min-h-full h-fit grid gap-8">
      <Title title="プロフィール登録" />
      <SetupForm />
    </div>
  );
}
