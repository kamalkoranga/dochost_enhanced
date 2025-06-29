import { FileText, Folder, Image, Music, Video } from "lucide-react";

const getFileIcon = (type) => {
  const iconClass = "w-6 h-6";
  switch (type) {
    case 'folder':
      return <Folder className={`${iconClass} text-blue-500`} />;
    case 'pdf':
      return <FileText className={`${iconClass} text-red-500`} />;
    case 'image':
      return <Image className={`${iconClass} text-green-500`} />;
    case 'video':
      return <Video className={`${iconClass} text-purple-500`} />;
    case 'audio':
      return <Music className={`${iconClass} text-orange-500`} />;
    default:
      return <FileText className={`${iconClass} text-gray-500`} />;
  }
};

export default getFileIcon;