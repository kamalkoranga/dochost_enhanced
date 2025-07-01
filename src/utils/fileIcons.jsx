import { FileArchive, FileText, Folder, Image, Music, Presentation, Video } from "lucide-react";

const getFileIcon = (type) => {
  const iconClass = "w-6 h-6";
  switch (type) {
    case 'folder':
      return <Folder className={`${iconClass} text-blue-500`} />;
    case 'application/pdf':
      return <FileText className={`${iconClass} text-red-500`} />;
    // case for all images/*
    case 'image/png':
    case 'image/jpeg':
    case 'image/gif':
    case 'image/webp':
    case 'image/svg+xml':
      return <Image className={`${iconClass} text-green-500`} />;
    case 'video/mp4':
      return <Video className={`${iconClass} text-purple-500`} />;
    case 'audio/mpeg':
      return <Music className={`${iconClass} text-orange-500`} />;
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return <Presentation className={`${iconClass} text-yellow-500`} />;
    case 'application/zip':
      return <FileArchive className={`${iconClass} text-teal-500`} />;
    default:
      return <FileText className={`${iconClass} text-gray-500`} />;
  }
};

export default getFileIcon;