import { getCurrentUser } from '@/lib/auth';

export default async function SettingsPage() {
  const user = await getCurrentUser();

  return (
    <main>
      <h1>Settings</h1>
      <form>
        <label>
          Name
          <input type="text" defaultValue={user.name} />
        </label>
        <label>
          Email
          <input type="email" defaultValue={user.email} />
        </label>
        <button type="submit">Save</button>
      </form>
    </main>
  );
}
