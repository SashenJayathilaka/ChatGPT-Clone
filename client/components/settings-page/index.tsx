import Header from "../Header";
import { userSettings } from "../data/columns";

type Props = {};

const labelStyles = "block text-sm font-medium dark:text-white";
const textStyles =
  "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white";

function SettingsPage({}: Props) {
  return (
    <div className="p-8">
      <Header name="Settings" />
      <div className="space-y-4">
        <div>
          <label className={labelStyles}>Username</label>
          <div className={textStyles}>{userSettings.username}</div>
        </div>
        <div>
          <label className={labelStyles}>Email</label>
          <div className={textStyles}>{userSettings.email}</div>
        </div>
        <div>
          <label className={labelStyles}>Team</label>
          <div className={textStyles}>{userSettings.teamName}</div>
        </div>
        <div>
          <label className={labelStyles}>Role</label>
          <div className={textStyles}>{userSettings.roleName}</div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
