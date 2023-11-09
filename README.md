# squire-editor

Web component frontend for the [Squire](https://github.com/fastmail/Squire) editor. It is a reimplementation of [this wonderful implementation](https://blog.lekoala.be/finding-a-lightweight-yet-extensible-wysiwyg-editor) by LeKoala.

## Warning
Unfortunately Squire doesn't work with the shadowDOM. So the element is open. It's not certain if it's related, but moving the element after creation causes the reference to be faulty resulting in loss of functionality of the editor. Use at your own risk.
