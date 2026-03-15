import fs from "fs/promises";
import path from "path";

export const buildDirectoryTree = async (
  fileFolderNamePath: string,
  finalArr: any[],
) => {
  // Base Case :-

  console.log("All Path ", fileFolderNamePath);
  const stats = await fs.stat(fileFolderNamePath);

  console.log(stats.isFile(), fileFolderNamePath);
  if (stats.isFile()) {
    finalArr.push({
      path: fileFolderNamePath,
      name: fileFolderNamePath.split("/")[
        fileFolderNamePath.split("/").length - 1
      ],
      type: "file",
      children: [],
    });

    return;
  }

  // if it is a directory :-
  // Iterate over its all children :-
  const data = await fs.readdir(fileFolderNamePath);

  if (stats.isDirectory()) {
    console.log("DaTA IS ", data);
    for (let i = 0; i < data.length; i++) {
      let arr: any[] = [];
      // call for the build directory tree function :-
      let fileArr = await buildDirectoryTree(
        path.join(fileFolderNamePath, data[i]),
        arr,
      );

      const innerStats = await fs.stat(path.join(fileFolderNamePath, data[i]));
      finalArr.push({
        path: path.join(fileFolderNamePath, data[i]),
        name: data[i],
        type: innerStats.isFile() ? "file" : "folder",
        children: fileArr || [],
      });
    }
  }

  return finalArr;
};

//backend\Projects\4c7ca709-fb82-47c3-b964-4f6e963aa9f2

// {
//   "path": "photos",
//   "name": "photos",
//   "size": 600,
//   "type": "directory",
//   "children": [
//     {
//       "path": "photos/summer",
//       "name": "summer",
//       "size": 400,
//       "type": "directory",
//       "children": [
//         {
//           "path": "photos/summer/june",
//           "name": "june",
//           "size": 400,
//           "type": "directory",
//           "children": [
//             {
//               "path": "photos/summer/june/windsurf.jpg",
//               "name": "windsurf.jpg",
//               "size": 400,
//               "type": "file",
//               "extension": ".jpg"
//             }
//           ]
//         }
//       ]
//     },
//     {
//       "path": "photos/winter",
//       "name": "winter",
//       "size": 200,
//       "type": "directory",
//       "children": [
//         {
//           "path": "photos/winter/january",
//           "name": "january",
//           "size": 200,
//           "type": "directory",
//           "children": [
//             {
//               "path": "photos/winter/january/ski.png",
//               "name": "ski.png",
//               "size": 100,
//               "type": "file",
//               "extension": ".png"
//             },
//             {
//               "path": "photos/winter/january/snowboard.jpg",
//               "name": "snowboard.jpg",
//               "size": 100,
//               "type": "file",
//               "extension": ".jpg"
//             }
//           ]
//         }
//       ]
//     }
//   ]
// }
