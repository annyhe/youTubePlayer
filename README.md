# YouTube Player Lightning Web Component

These are two Lightning Web Components to add YouTube video playing capabilities to your Salesforce org. Configure which video to play via the Lightning App Builder. Light up your org with videos for training, enablement, entertainment ... The possibilities are endless!

Here’s a video of how to configure the finished components. Enjoy the Mozart’s Eine Kleine Nachtmusik in the background! (https://drive.google.com/open?id=1KizkUURFWxrsljgl0KWERSVYf6zhNdnW)

Use the **basicYouTubePlayer** for Home and App pages, and **youTubePlayerRecordWrapper** component for Record pages.

> These components are designed to run on Salesforce Platform. If you want to experience Lightning Web Components on any platform, please visit https://lwc.dev, and try out our Lightning Web Components sample application [LWC Recipes OSS](https://github.com/trailheadapps/lwc-recipes-oss).

## Installing Components using a Scratch Org

1. Set up your environment. Follow the steps in the [Quick Start: Lightning Web Components](https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/) Trailhead project. The steps include:

-   Enable Dev Hub in your Trailhead Playground
-   Install Salesforce CLI
-   Install Visual Studio Code
-   Install the Visual Studio Code Salesforce extensions, including the Lightning Web Components extension

2. If you haven't already done so, authenticate with your hub org and provide it with an alias (**myhuborg** in the command below):

```
sfdx force:auth:web:login -d -a myhuborg
```

3. Clone the youTubePlayer repository:

```
git clone https://github.com/annyhe/youTubePlayer
cd youTubePlayer
```

4. Create a scratch org and provide it with an alias (**youTubePlayer** in the command below):

```
sfdx force:org:create -s -f config/project-scratch-def.json -a youTubePlayer
```

5. Push the app to your scratch org:

```
sfdx force:source:push
```

6. Open the scratch org:

```
sfdx force:org:open
```

### Directions to add a YouTube player component to an App or Home page

1. Go to an App or Home page. Click on the **Setup** icon on the top left, then click **Edit Page**.

2. Drag the **basicYouTubePlayer** component onto the page.

3. In the Lightning App Builder, set youTubeId field to the desired YouTube video's id.

4. Click **Save**, then **Back**.

5. Enjoy your YouTube player on the App or Home page!

### Directions to add a YouTube player component to a Record page

1. Go to a Record page. Click on the **Setup** icon on the top left, then click **Edit Page**.

2. Drag the **youTubePlayerRecordWrapper** component onto the page.

3. In the Lightning App Builder, set the fieldName field to the name of the field that holds the YouTube video ID.

4. Click **Save**, then **Back**.

5. Enjoy your YouTube player on the Record page!
