import { createStore } from "zustand/vanilla";

const assetsToLoad = [
    {
        id: 'avatar',
        path: '/models/avatar.glb',
        type: 'model',
    },
];

const assetStore = createStore((set) => ({
    assetsToLoad,
    loadedAssets: {},
    addLoadedAssets: (asset, id) => set((state) => ({
            loadedAssets: {
                ...state.loadedAssets,
                [id]: asset
            }
        })),
}));

export default assetStore;