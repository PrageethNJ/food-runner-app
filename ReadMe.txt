1. Install Node.js
2. Create a new expo project
	npx create-expo-app@latest food-runner-app -t
	select Blank(TypeScript)
	(optional) update all dependencies based on Expo using the following command:
		   npx expo install --fix
3. initialize git
	git init
4. Install expo router according to the expo docs. (https://docs.expo.dev/router/installation/)
5. Run the app
	npm start 
____________________________________________________________________________________________________________________________

6. copy folder src and tsconfig.jason file from test-super-base-app. then delete Auth and Account from components.
7. Install the supabase client library and dependencies
	npx expo install @supabase/supabase-js @react-native-async-storage/async-storage @rneui/themed react-native-url-polyfill
_____________________________________________________________________________________________________________________________

8. Install expo crypto to generate unique uuid
	npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
	npx expo install expo-crypto
9. Install expo image picker
	npx expo install expo-image-picker
10. Install Day.js, it is a minimalist JavaScript library that parses, validates, manipulates, and displays dates and times for modern browsers with a largely Moment.js-compatible API.
	npm install dayjs
11. Install Material Top Tabs navigator
	npm install @react-navigation/material-top-tabs react-native-tab-view
	npx expo install react-native-pager-view
12.
