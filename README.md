# Pathfinder

A free Mac utility for finding and inserting file and folder paths.

**[Visit the website](https://mweisberg21.github.io/pathfinder/)** · **[Download for Mac](https://mweisberg21.github.io/pathfinder/downloads/Pathfinder-0.1.0-macOS-arm64.dmg)**

Requires Apple silicon and macOS 14 or later. Version 0.1.0 is an early release, signed with Developer ID and notarized by Apple.

## Install

1. Download and open the DMG.
2. Drag Pathfinder to Applications, then launch it there.
3. Choose Enable Insertion if you want to paste into other apps. In the macOS permission pane that opens, enable Pathfinder and authenticate if macOS asks. Return to Pathfinder. Search and Copy also work without this permission.
4. Click a text field and press Control–Option–Space. Type a filename or folder name, select a result, and press Return.
5. Customize the shortcut in Settings. Command–Return always copies the path.

A path is plain text, not a file attachment or permission for another app to read it. Search uses Spotlight, so excluded or unindexed files may not appear; use the file chooser for those.

## Downloads

The public [release notes](https://mweisberg21.github.io/pathfinder/release-notes.html) link to the installer and checksum on the website. The installer is also available from [GitHub Releases](https://github.com/mweisberg21/pathfinder/releases/tag/v0.1.0).

This public repository contains only the download website and compiled app installer. The native app source is private and is not included in this repository or its history. Pathfinder is free to download and use.

## Website development

Static HTML, CSS, and JavaScript; no dependencies or build step. Serve `docs/` with any static HTTP server. `demo.js` uses fictional local data only and never reads real files or the clipboard. GitHub Pages serves `/docs` on `main`. Everything in this repository is public: do not add native source, private configuration, credentials, or internal documentation anywhere in the repository.
