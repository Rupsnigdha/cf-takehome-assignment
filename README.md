# Next.js Project

This is a Next.js project.

## Getting Started

### Clone the Repository

```sh
git clone <https://github.com/Rupsnigdha/cf-takehome-assignment>
cd <cf-takehome-assignment>
```

### Install Dependencies

```sh
npm install
```

### Run the Development Server

```sh
npm run dev
```

Open [http://localhost:3000/dashboard](http://localhost:3000) with your browser to see the result.

## Build for Production

```sh
npm run build
npm start
```

## Improvements

### Execution Flow

1. Changed the deployment name dropdown to also include the label. This provides visual guidelines for the user to see the setting being affected by their seletion.
2. Pre-rendered the logs before the execution flow begins. We should be able to do this because the workflow has already been configured.
3. Included time of execution of each step of the process, as the time it took from the inital execution. All of this data can be swapped for other meaningful data.
4. Once the output is generated, added copy and download buttons, in case the user wants to further study the data.
5. Made the output render inside a `<pre>` tag, thus formatting the JSON response properly, making it more legible.

### Execution logs

1. Changed the implementation of the side panel and integrated it into the sidebar. This provides a consistent sidebar throughout the project. This also frees up a lot of space to render other meaningful data for each execution.
2. Added a settings icon to allow users to have a separate place to edit their descriptions and tags.
3. Implemented sorting in the table based on various columns.
4. Removed duplicated executionID in the expanded view.
5. Added a copy and download button, in case the user wants to further study the data.
6. Made the JSON render inside a `<pre>` tag, thus formatting the JSON response properly, making it more legible.
