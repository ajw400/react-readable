import React from 'react'
import { Nav, NavLink } from 'reactstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const PostForm = ({ author, open, body, title, categories, openPostForm, closePostForm, category, handleInputChange, handlePostSubmit }) => {
    console.log("categories", categories)
    return (
      <div>
        <NavLink href="#" onClick={openPostForm}>New</NavLink>
        <Modal isOpen={open}>
          <ModalHeader toggle={closePostForm}>Submit Post</ModalHeader>
          <form onSubmit={handlePostSubmit}>
          <ModalBody>
              <input
                name="author"
                value={author}
                type="text"
                placeholder="author"
                onChange={handleInputChange} />
              <input
                name="title"
                value={title}
                type="text"
                placeholder="title"
                onChange={handleInputChange} />
            <br />
              <textarea
                name="body"
                placeholder="comment"
                value={body}
                onChange={handleInputChange} />
            <br />
            <label>
              Category:
              <select value={category} name="category" onChange={handleInputChange}>
                {categories.map(cat => <option value={cat}>{cat}</option> )}
              </select>
            </label>
            </ModalBody>
            <ModalFooter>
              <Button href="#" onClick={closePostForm}>close</Button>
              <input className="button" type="submit" value="Submit" />
            </ModalFooter>
          </form>
        </Modal>
      </div>
    )
}

export default PostForm
