BEHIND-THE-SCENES PHOTOS FOR THE ABOUT SECTION
==============================================

Drop 4 photos in THIS folder with these exact names (JPG or WebP, portrait
4:5 crop looks best, ~1200px tall):

    camera.jpg     - camera / on-set shot
    monitor.jpg    - director monitor / creative direction
    lighting.jpg   - lighting / production moment
    editing.jpg    - editing suite / colour grade

Then open  src/components/sections/About.tsx  and set:

    const USE_LOCAL_PHOTOS = true;

Until then the section shows real frames pulled from the campaign reels.
