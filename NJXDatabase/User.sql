CREATE TABLE [dbo].[user] (
	userID int IDENTITY(1,1) PRIMARY KEY,
	fullName varchar(30),
	email varchar(30),
	pwd varchar(30)

)