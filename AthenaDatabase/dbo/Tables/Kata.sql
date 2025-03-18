CREATE TABLE [dbo].[Kata]
(
	[KataID] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, 
	[Description] TEXT,
	[DateAssigned] DATETIME,
	[KataName] Text
)