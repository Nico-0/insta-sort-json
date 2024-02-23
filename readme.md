
## About

- Allows loading previously exported public Instagram data
- Moving and filtering users between lists
- Exporting back to a json file

_All of the data is stored temporarily in your device (either until you replace your device, or until you erase the data)._
_At no point any of the data is shared or sold._

- Can be used in conjunction with [GrowBot](https://chromewebstore.google.com/detail/growbot-automator-for-ins/abhcgokmndbiegmmbjffdlpihgdmeejf)

## Installation and Running

- Config a MySQL database in `src/app.js`
- Run the `create.sql` script in your database
- `npm install`
- `npm run dev`
- Open http://localhost:3000/
- Load `sample_data.json` from the Load JSON button
- ~~(Optional) Use Update thumbs button to fix images. Run `sample_data.json` (delete "edge_followed_by") through external GrowBot app first, to get non expired links.~~ *requires change filename support*

## Data format

- See `sample_data.json`, GrowBot exports in that format.
- Basic data, available without doing an additional request to a specific profile, is limited to: `id`, `username`, `full_name`, `profile_pic_url`, `is_verified`, `followed_by_viewer`, `requested_by_viewer`.
- Data can also be obtained while browsing the web naturally, filter for network requests to `/api` (and possibly more).


### Planned features

- Add support to locally run machine learning models, and apply the result to the data.