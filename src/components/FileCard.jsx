import { MoreVertical, Star } from "lucide-react";
import getFileIcon from "../utils/fileIcons";

const FileCard = ({ file }) => {
  return (
    <div key={file.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition cursor-pointer group">
      <div className="flex items-center justify-between mb-3">
        {getFileIcon(file.type)}
        <div className="opacity-0 group-hover:opacity-100 transition">
          <button className="p-1 hover:bg-gray-100 rounded">
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="font-medium text-gray-900 text-sm truncate">{file.name}</h3>
        <p className="text-xs text-gray-500">{file.size}</p>
        <p className="text-xs text-gray-400">{file.modified}</p>
      </div>

      {file.starred && (
        <Star className="w-4 h-4 text-yellow-400 fill-current mt-2" />
      )}
    </div>
  )
}

export default FileCard;