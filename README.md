

## Overview

This project is a campaign maintainer application built with React and TypeScript. It uses Material-UI's DataGrid for displaying campaign data and provides a date filter for filtering campaigns based on their start and end dates.

## Main Component: Maintainer

The `Maintainer` component is the main component of the application. It manages the state of the campaigns and renders the `DataGrid` and `DateFilter` components.

### Installation and Usage

Follow these steps to install and run the project:

1. **Clone the repository**

   Use the following command to clone the repository:

   ```bash
   git clone https://github.com/diegovc2/mantainer.git
    ```
    Replace `username` and `repository` with the actual username and repository name.

    2. **Navigate to the project directory**

    Use the following command to navigate to the project directory:

    ```bash
    cd mantainer
    ```

    3. **Install the dependencies**

    Use the following command to install the project dependencies:

    ```bash
    npm install
    ```
    4. **Start the project**

    Use the following command to start the project:

    ```bash
    npm start
    ```
    The project will start, and you can access it at `http://localhost:3000`.

    5. **Usage**

    Try mixing the filters from start, end Date and search getRandomValues.

### State

The `Maintainer` component maintains the following state variables:

- `isLoading`: A boolean indicating whether the campaign data is still loading.
- `campaigns`: An array of `Campaign` objects representing the current list of campaigns.
- `localCampaigns`: An array of `Campaign` objects representing the original list of campaigns.

### Methods

The `Maintainer` component defines the following methods:

- `window.addCampaigns`: A method added to the `window` object for adding new campaigns to the `campaigns` and `localCampaigns` state variables.

### Effects

The `Maintainer` component uses the `useEffect` hook to initialize the `campaigns` and `localCampaigns` state variables with data from `campaignData`.

### Render

The `Maintainer` component renders a `LocalizationProvider` component that wraps a `Grid` container. The `Grid` container contains two items:

- A `Paper` component that contains a title and the `DateFilter` component.
- A `DataGrid` component that displays the campaign data.

## Custom Imports

- `DateFilter`: A component for filtering campaigns based on their start and end dates.
- `CampaignDataGrid`: A component for displaying campaign data in a `DataGrid`.

## Styles

The styles for the `Maintainer` component are defined in the `page.css` file.

## Interfaces

- `Campaign`: An interface representing a campaign. It includes the following properties: `id`, `name`, `startDate`, `endDate`, `active`, and `budget`.

## Global Declarations

The `window` object is extended with a new method `addCampaigns` for adding new campaigns to the `campaigns` and `localCampaigns` state variables.

## Dependencies

- `dayjs`: A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
- `@mui/x-data-grid`: A fast and flexible data grid component from Material-UI.
- `@mui/material`: A set of React components that implement Google's Material Design.
- `@mui/x-date-pickers`: A set of date picker components from Material-UI.
- `@mui/x-date-pickers/AdapterDayjs`: An adapter for using `dayjs` with Material-UI's date picker components.
