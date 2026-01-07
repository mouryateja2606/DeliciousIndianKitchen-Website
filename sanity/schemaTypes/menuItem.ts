import { defineField, defineType } from 'sanity'

export const menuItem = defineType({
    name: 'menuItem',
    title: 'Menu Item',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Starters', value: 'Starters' },
                    { title: 'Biryani', value: 'Biryani' },
                    { title: 'Dosa & Uttapam', value: 'Dosa' },
                    { title: 'Curries', value: 'Curries' },
                    { title: 'Snacks', value: 'Snacks' },
                    { title: 'Drinks', value: 'Drinks' },
                ],
            },
            initialValue: 'Curries',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'attributes',
            title: 'Attributes',
            type: 'object',
            fields: [
                defineField({ name: 'isVeg', type: 'boolean', title: 'Vegetarian' }),
                defineField({ name: 'isSpicy', type: 'boolean', title: 'Spicy' }),
                defineField({ name: 'containsMilk', type: 'boolean', title: 'Contains Milk' }),
                defineField({ name: 'isKidFriendly', type: 'boolean', title: 'Kid Friendly' }),
            ]
        }),
    ],
})
