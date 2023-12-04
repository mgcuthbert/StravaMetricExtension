# StravaMetricExtension
An extension for Chrome that allows a user to display KMs alongside miles and vica versa.

## Installation
The easiest installation is to go to the current Release and simply download the zip or tarball package for that release and then skip to the "Chrome Installation" section. The packages are available from version 0.1.0 and onwards, however I also want to point out that Github only holds onto those packages for 90 days, so there is a possibility that the package will be gone. The method below download the source code and build and run it is fairly straight forward, however you will need NPM installed on your system to be able to build it. For more information on that you can look [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Otherwise happy training!

### Download
1. Go to the latest release in Github, which can be found here: [https://github.com/mgcuthbert/StravaMetricExtension/releases/tag/0.1.0](https://github.com/mgcuthbert/StravaMetricExtension/releases/tag/0.1.0). 
2. You can then download the packaged source code either in zip or tar.gz.
    - If the release package is available you can just download that and save yourself time trying to build and run it.
4. Once downloaded extract the code to some folder on your desktop.

### Build and Run
You will then need to build the code to build the package for Chrome. This will probably work for Firefox as well, but I haven't really tried. If you have downloaded the code from above, you can obviously skip the cloning step. Or if you want you can skip the download step and just clone. 
```js
 git clone https://github.com/mgcuthbert/StravaMetricExtension.git
 cd StravaMetricExtension
 npm install
 npm run build 
```

### Chrome Installation
Once the package has been built, it would have created the package in the build directory. In Chrome perform the following steps:
1. Click on the three dots in the top right corner and select "More Tools" and then "Extensions".
2. This will open a webpage with the "Extensions" heading. In the top right corner of the page, turn on "Developer mode"
3. Click on "Load unpacked" and browse to the "build" directory where your newly built MyPlan and click "Select".

Once you have preformed these steps you should have a new extension installed in Chrome.
