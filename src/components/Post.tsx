import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'

import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: string;
}

export function Post({author, publishedAt, content}: PostProps) {

    const [ comments, setComments ] = useState([
        'Post muito bacana, hein?!'
    ]);

    const [newComment, setNewComment] = useState('')
    
    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    })
    
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    })
    
    function handleNewComment(event: FormEvent) {
        event.preventDefault()

        setComments([...comments, newComment])

        setNewComment('')
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')

        setNewComment(event.target.value)
    }

    function handleInvalidNewComment(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo não pode ficar em branco!')
    }

    function deleteComment(commentToDelete: string) {

        const commentWithoutDeleteOne = comments.filter(comment => comment !== commentToDelete)

        setComments(commentWithoutDeleteOne)
    }

    const isNewCommentIsEmpty = newComment.length === 0

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar
                        img={author.avatarUrl}
                    />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                <p>{content}</p>
                <p><a href="">👉 jane.design/doctorcare</a></p>
                <p>
                    <a href="">#novoprojeto</a>{' '}
                    <a href="">#nlw</a>{' '}
                    <a href="">#rocketseat</a>{' '}
                    </p>
            </div>

            <form onSubmit={handleNewComment} className={styles.comentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea
                    placeholder="Deixe um comentário"
                    value={newComment}
                    onChange={handleNewCommentChange}
                    onInvalid={handleInvalidNewComment}
                    required
                />

                <footer>
                    <button type="submit" disabled={isNewCommentIsEmpty}>
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.comentList}>
                {comments.map(comment => {
                    return (
                      <Comment
                        key={comment}
                        content={comment}
                        deleteComment={deleteComment}
                       />  
                    )
                })}
            </div>
        </article>
    )
}