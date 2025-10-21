# Editor dependency setup

Install the rich-text editor dependencies:

- react-quill@2 (peer dep: quill)
- quill

Notes:

- The component `app/admin/RichTextEditor.tsx` already imports the snow theme CSS.
- These packages are client-only and are dynamically loaded via next/dynamic to avoid SSR issues.
