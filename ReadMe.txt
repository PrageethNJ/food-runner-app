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
7.  Install the supabase client library and dependencies
	npx expo install @supabase/supabase-js @react-native-async-storage/async-storage @rneui/themed react-native-url-polyfill
_____________________________________________________________________________________________________________________________

 8.