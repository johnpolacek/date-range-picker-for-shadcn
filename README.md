# `DateRangePicker` Component

`DateRangePicker` is a reusable component built with Shadcn using beautifully designed components from Radix UI and Tailwind CSS. It provides a dropdown interface to allow users to select or enter a range of dates and includes additional options such as preset date ranges and an optional date comparison feature.

[View the Demo](https://date-range-picker-for-shadcn-demo.vercel.app/)


## Installation

The `DateRangePicker` depends on the following components from shadcn:

- [Button](https://ui.shadcn.com/docs/components/button)
- [Calendar](https://ui.shadcn.com/docs/components/calendar)
- [Label](https://ui.shadcn.com/docs/components/label)
- [Popover](https://ui.shadcn.com/docs/components/popover)
- [Switch](https://ui.shadcn.com/docs/components/switch)

If you are using the CLI for installation, you can do this:

```
npx shadcn-ui@latest add button calendar label popover switch
```

The DateRangePicker uses [icons from Radix UI](https://icons.radix-ui.com/) so you will need to install that or update the component to use a different library.

```
npm install @radix-ui/react-icons
```

Next, copy and paste the code from the `/src` directory for [`DateInput`](https://github.com/johnpolacek/date-range-picker-for-shadcn/blob/main/src/date-input.tsx) and [`DateRangePicker`](https://github.com/johnpolacek/date-range-picker-for-shadcn/blob/main/src/date-range-picker.tsx) into your project and customize to your needs. The code is yours.


## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `onUpdate` | function | - | Callback function that is called when the date range is updated. The function receives an object containing the selected date range and, if the compare feature is enabled, the compare date range. |
| `initialDateFrom` | Date or string | Today’s Date | The initial start date for the main date range. |
| `initialDateTo` | Date or string | - | The initial end date for the main date range. |
| `initialCompareFrom` | Date or string | - | The initial start date for the compare date range. |
| `initialCompareTo` | Date or string | - | The initial end date for the compare date range. |
| `align` | string | `'end'` | The alignment of the dropdown popover. Options are `'start'`, `'center'`, or `'end'`. |
| `locale` | string | `'en-US'` | The locale used for date formatting. |
| `showCompare` | boolean | `true` | Whether to show the compare date range feature. |

## Example

```jsx
<DateRangePicker
  onUpdate={(values) => console.log(values)}
  initialDateFrom="2023-01-01"
  initialDateTo="2023-12-31"
  align="start"
  locale="en-GB"
  showCompare={false}
/>
```

This example creates a `DateRangePicker` component with an initial date range from January 1, 2023 to December 31, 2023. The dropdown popover is aligned to the start of the trigger button, the dates are formatted according to the 'en-GB' locale, and the compare feature is hidden. The `onUpdate` function logs the selected date range to the console.

