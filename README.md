# Mopidy Hass Playlists

A custom Home Assistant Lovelace card for managing Mopidy playlists. This card provides a visual interface for creating, modifying, and removing playlists through the mopidyhass integration.

## Features

- **View all playlists** - Browse and select from all available Mopidy playlists
- **Create playlists** - Create new empty playlists or from current queue
- **Delete playlists** - Remove playlists with confirmation dialog
- **View playlist tracks** - See all tracks in a playlist with artist and duration info
- **Reorder tracks** - Drag and drop to reorder tracks within a playlist
- **Remove tracks** - Delete individual tracks from a playlist
- **Add tracks** - Add tracks from queue or search to existing playlists
- **Play playlists/tracks** - Quick play buttons for playlists and individual tracks

## Requirements

- Home Assistant 2024.1.0 or later
- Mopidy Hass Playlists integration with services enabled
- Mopidy media player entity configured in Home Assistant

## Installation

### HACS (Recommended)

1. Open HACS in Home Assistant
2. Go to "Frontend"
3. Click the "+" button
4. Select "Custom Repository"
5. Add this repository URL and select "Lovelace" as the category
6. Click "Add"
7. Search for "Mopidy Playlist Card" and install it
8. Add the card to your dashboard

### Manual Installation

1. Download the latest release
2. Copy `dist/mopidy-playlist-card.js` to your `/config/www/` directory
3. Add the resource to your Lovelace configuration:
   ```yaml
   resources:
     - url: /local/mopidy-playlist-card.js
       type: module
   ```
4. Add the card to your dashboard

## Configuration

### Card Configuration

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `type` | string | Yes | - | `custom:mopidy-playlist-card` |
| `entity` | string | Yes | - | Your Mopidy media player entity |
| `title` | string | No | `Playlist Manager` | Card title |
| `show_queue_button` | boolean | No | `true` | Show save queue button |

### Example Configuration

```yaml
type: custom:mopidy-playlist-card
entity: media_player.living_room_mopidy
title: My Playlists
show_queue_button: true
```

### Visual Editor

The card includes a visual configuration editor. When adding a new card:

1. Search for "Mopidy Playlist Card"
2. Select your Mopidy entity
3. Customize the title and options
4. Save

## Usage

### Creating a Playlist

1. Click the "+" button in the card header
2. Enter a name for the playlist
3. Choose whether to create an empty playlist or from current queue
4. Click "Create"

### Viewing Playlist Details

1. Click on any playlist in the list
2. View all tracks with their details
3. Use drag handles to reorder tracks
4. Click the X button to remove tracks
5. Click "Save" to persist changes

### Adding Tracks to a Playlist

1. Open a playlist
2. Click "Add Tracks"
3. Choose from current queue or search the library
4. Click the "+" button next to any track to add it

### Deleting a Playlist

1. Click the trash icon on a playlist
2. Confirm the deletion in the dialog

### Playing Content

- Click the play button on a playlist to play the entire playlist
- Click on a track name to play that specific track

## Backend Services Required

This card requires the following services from the mopidyhass integration:

| Service | Description |
|---------|-------------|
| `{entity}_create_playlist` | Create a new playlist |
| `{entity}_delete_playlist` | Delete a playlist |
| `{entity}_rename_playlist` | Rename a playlist |
| `{entity}_add_to_playlist` | Add tracks to a playlist |
| `{entity}_remove_from_playlist` | Remove tracks from a playlist |
| `{entity}_move_in_playlist` | Reorder tracks in a playlist |
| `{entity}_clear_playlist` | Clear all tracks from a playlist |
| `{entity}_save_queue_to_playlist` | Save current queue as a playlist |

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/your-repo/mopidy-hass-playlists.git
cd mopidy-hass-playlists

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure

```
mopidy-hass-playlists/
├── src/
│   ├── index.ts                    # Entry point, card registration
│   ├── mopidy-playlist-card.ts     # Main card component
│   ├── components/
│   │   ├── playlist-list.ts        # Playlist list view
│   │   ├── playlist-detail.ts      # Playlist detail view
│   │   ├── playlist-editor.ts      # Card configuration editor
│   │   ├── track-item.ts           # Track row component
│   │   ├── track-search.ts         # Track search component
│   │   ├── create-playlist-dialog.ts
│   │   └── confirm-dialog.ts
│   ├── services/
│   │   └── mopidy-service.ts       # Mopidy API wrapper
│   ├── models/
│   │   └── playlist.ts             # Data models
│   ├── types/
│   │   └── home-assistant.ts       # TypeScript types
│   └── styles/
│       └── shared-styles.ts        # Shared CSS styles
├── dist/                           # Build output
├── package.json
├── tsconfig.json
├── vite.config.ts
└── hacs.json
```

### Technologies

- **TypeScript** - Type-safe development
- **Lit 3.x** - Web components framework
- **Vite** - Build tool
- **SortableJS** - Drag and drop functionality

## Troubleshooting

### Card not loading

1. Check that the JavaScript file is accessible at the configured URL
2. Verify the resource is properly configured in Lovelace
3. Check browser console for errors

### Playlists not loading

1. Verify the mopidyhass integration is properly configured
2. Check that the correct entity is selected
3. Ensure the Mopidy server is running and accessible

### Services not working

1. Verify the mopidyhass services are registered in Home Assistant
2. Check Home Assistant logs for service call errors
3. Ensure the entity name matches the service prefix

## License

MIT License - See LICENSE file for details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Credits

- Built for the [mopidyhass](https://github.com/your-repo/mopidyhass) integration
- Uses [Lit](https://lit.dev/) for web components
- Uses [SortableJS](https://sortablejs.github.io/Sortable/) for drag and drop
