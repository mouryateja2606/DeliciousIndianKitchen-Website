import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes/index'

export default defineConfig({
    name: 'default',
    title: 'Delicious Indian Kitchen',

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mock_project_id',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

    basePath: '/admin',

    plugins: [structureTool()],

    schema: {
        types: schemaTypes,
    },
})
