# CarePackageConnect

Final project for Concordia University Bootcamp

This app is designed to let users:

- Find and add one another as friends based on their user names;
- Send messages to one another; and
- Get Canada Post Shipping rates in real time.

This app is also designed responsively. It is just as useable on mobile devices as it is on desktop computers.

Landing page:

![Landing-Page](https://user-images.githubusercontent.com/91158694/169681625-c1f2a968-178e-4d4c-b434-36d083fa5ab2.png)

Sign-In:

Users sign in using their username and password. For added security, passwords are encrypted using Argon2.

![Signing-In](https://user-images.githubusercontent.com/91158694/169681463-873c8e97-a13c-42c4-a7a1-4884f8ccf92e.png)
![Mobile-Sign-In](https://user-images.githubusercontent.com/91158694/169681229-21da9619-13d8-4d66-bb6e-232b6ce16555.png)

Sign-up:

Users who do not have an accout can create one. Credit card information is optionally collected, because eventually
CarePackageConnect's functionality will be expanded so users can purchase and print shipping labels at home.

![Sign-Up](https://user-images.githubusercontent.com/91158694/169676448-1898b573-2bbd-440b-8772-25eb159af090.png)
![Mobile- Sign-Up](https://user-images.githubusercontent.com/91158694/169681260-9917cd10-117f-4299-acc5-ac924b659c26.png)

Your Account:

 This is where the users can see their account information.

![Your-Account](https://user-images.githubusercontent.com/91158694/169675576-15f36cce-ce67-4d4b-ba84-fa8f61c45907.png)
![Mobile-User-Info](https://user-images.githubusercontent.com/91158694/169681263-be5a94e7-7627-459b-85df-0e95c0b9b9a1.png)

Messaging:

Users can message one another from their 'Messaging' tab.

![Messaging](https://user-images.githubusercontent.com/91158694/169676696-982ee762-25e9-47cc-9b1d-bc1ee527cbd7.png)
![Mobile - Messaging](https://user-images.githubusercontent.com/91158694/169681266-d1a22487-8d7c-44b0-b738-557e32c649c0.png)

Shipping:

CarePackageConnect utilizes the Canada Post shipping API, which takes requests and sends responses in xml only.
Therefore, this app utilizes an add-on called xml2js, which allows for conversion between xml, javascipt, and json formats.
Additional scripts were written to assemble requests to the Canada Post API based on user input.
Scripts were also written to parse through the responses from the API, to present the user with three shipping quotes
for each request made (Priority, Xpresspost, and Regular Parcel).

When screen width allows for it, users enjoy a short animation after submitting their request for shipping rates.

![Get-Shipping-Quotes(initial)](https://user-images.githubusercontent.com/91158694/169676154-c6a53679-838f-4dc0-bba3-9dc858c533d5.png)
![Get-Shipping-Quote(after animation)](https://user-images.githubusercontent.com/91158694/169676156-cb35b776-539f-4045-bffe-c3ab3057a574.png)
![Mobile-Shipping](https://user-images.githubusercontent.com/91158694/169681275-f9576ca8-f714-4cd9-a0a7-3cfe4fba3bbc.png)

Friends:

Users can add, delete, and view their friends from their 'Friends' tab.

![Friends](https://user-images.githubusercontent.com/91158694/169681295-2e2e4719-5184-4981-85f2-9e5cffffdd83.png)
![Mobile - Friends](https://user-images.githubusercontent.com/91158694/169681297-4cbdcdd0-d3b9-4283-893c-d377efc364d6.png)

Log-Out:

Users who log out are presented with a nice looking modal asking them to confirm logout.

![Log-Out](https://user-images.githubusercontent.com/91158694/169676800-f9a816ac-5dc9-40e1-b06b-ecd1d14c3f41.png)
![Mobile - Log-Out](https://user-images.githubusercontent.com/91158694/169681313-274bec0f-54e8-44ff-a9cc-6c7a6a6060af.png)
