CREATE TABLE [dbo].[StudentKata]
(
	[StudentID] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, 
	[UserID] UNIQUEIDENTIFIER NOT NULL,
	[KataID] UNIQUEIDENTIFIER NOT NULL,
	[Complete] BIT,
	[CompleteDate] DATETIME,
    [CompletionTime] VARCHAR(15),
	[StudentCode] TEXT,
	[StudentNotes] TEXT,
	[AdminFeedback] TEXT,
	CONSTRAINT [PK_StudentKata] PRIMARY KEY CLUSTERED ([StudentID] ASC, [KataID] ASC),
	FOREIGN KEY (StudentID,UserID) REFERENCES Student(StudentID,UserID)
)