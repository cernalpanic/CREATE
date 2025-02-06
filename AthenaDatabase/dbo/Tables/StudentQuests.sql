CREATE TABLE [dbo].[StudentQuests]
(
	[StudentID] UNIQUEIDENTIFIER NOT NULL, 
    [QuestID] UNIQUEIDENTIFIER NOT NULL, 
    [Completed] BIT NOT NULL, 
    [LastActivityDate] DATETIME NULL,
    CONSTRAINT [PK_StudentQuests] PRIMARY KEY CLUSTERED ([StudentID] ASC, [QuestID] ASC)
)
