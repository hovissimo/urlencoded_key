# urlencoded_key

This repo is just a simple reproduction of an "error" I found in Enhance.dev

I was surprised when keys in the CRUD scaffolds weren't automatically escaped.

The 'thingy' scaffold in this repo reproduces the behavior I found.

1. start the app and visit /thingies
2. Notice that a thingy was automatically created
3. Press the delete button, notice the 404


The 'encodedthingy' scaffold in this repo is basically identical, but I've tried to address the
issue by sprinkling in `encodeURIComponent` and `decodeURIComponent`.

1. start the app and visit /thingies
2. reload, and notice that the timestamp didn't update
3. Press the delete button (the encodedthingy is deleted), notice the timestamp has updated (because
   my quick hack of a demo created a new encodedthingy with a new timestamp)
