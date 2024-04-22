import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/utils/helper";

type Props = {
  onLogout: () => void;
};

const Profile = ({ onLogout }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="https://avatars.githubusercontent.com/u/19572851?v=4" />
        <AvatarFallback>{getInitials("Carlos Figueiredo")}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm font-medium">Carlos</p>
        <Button
          className="text-slate-700"
          variant="link"
          size="sm"
          onClick={onLogout}
        >
          Sair
        </Button>
      </div>
    </div>
  );
};

export default Profile;
