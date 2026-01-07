import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'menuCard',
    title: 'Menu Card',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Card Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
        },
    },
})
