import Image from "next/image";

interface InstagramProfileProps {
  username: string;
  name: string | null;
  accountType: string | null;
  instagramUserId: string;
  profilePictureUrl: string | null;
}

export default function InstagramProfile({
  username,
  name,
  accountType,
  instagramUserId,
  profilePictureUrl,
}: InstagramProfileProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-green-500 text-xl">&#10003;</span>
        <h2 className="text-lg font-semibold text-gray-800">
          Instagram Connected
        </h2>
      </div>

      <div className="flex flex-col items-center text-center">
        {profilePictureUrl ? (
          <Image
            src={profilePictureUrl}
            alt={`${username}'s profile`}
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover border-4 border-purple-100 mb-4"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-3xl font-bold mb-4">
            {username.charAt(0).toUpperCase()}
          </div>
        )}

        <h3 className="text-2xl font-bold text-gray-900">@{username}</h3>

        {name && <p className="text-gray-600 mt-1">{name}</p>}

        <div className="mt-6 w-full space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Account Type</span>
            <span className="font-medium text-gray-800">
              {accountType || "PERSONAL"}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Instagram ID</span>
            <span className="font-medium text-gray-800">{instagramUserId}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500">Status</span>
            <span className="inline-flex items-center gap-1 text-green-600 font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
