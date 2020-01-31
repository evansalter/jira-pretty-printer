# Jira Pretty Printer

This is a small webapp designed to take an XML export from a JQL query in Jira and format the results in readable and easily printable format.

You can access the app at https://evansalter.com/jira-pretty-printer/. Instructions to use are included on the webpage.

# Screenshots

![image](https://user-images.githubusercontent.com/10549733/73567280-afaf3880-442b-11ea-8dc7-a3d701d6d9a7.png)

An example issue:

![image](https://user-images.githubusercontent.com/10549733/73567666-74613980-442c-11ea-8baf-8b4a4b9e9f0d.png)

# Contributing

To run locally:

1. `npm i`
1. `npm run dev`

To deploy new version (manual for now):

1. Merge to master
1. `git checkout master`
1. `npm run build`
1. Commit and push

The deployed version will automatically be updated after the build completes.
