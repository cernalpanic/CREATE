CREATE TABLE [dbo].[Student]
(
	[StudentID] UNIQUEIDENTIFIER NOT NULL, 
    [UserID] UNIQUEIDENTIFIER NOT NULL, 
    [Exp] INT NOT NULL, 
    [Availability] NVARCHAR(256) NULL,
    [CurrentStandupStreak] INT NULL, 
    [LongestStandupStreak] INT NULL, 
    CONSTRAINT [PK_Student] PRIMARY KEY CLUSTERED ([StudentID] ASC, [UserID] ASC)
)
