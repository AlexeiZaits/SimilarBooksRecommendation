"""create users and books tables

Revision ID: 70e5bc969f2e
Revises: b17b6fd911f5
Create Date: 2024-09-05 17:18:52.668348

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '70e5bc969f2e'
down_revision: Union[str, None] = 'b17b6fd911f5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('books_table', sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
    op.add_column('books_table', sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
    op.alter_column('books_table', 'ID',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               nullable=False)
    op.alter_column('books_table', 'Title',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               existing_nullable=True)
    op.alter_column('books_table', 'Author',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               existing_nullable=True)
    op.alter_column('books_table', 'Link',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               existing_nullable=True)
    op.alter_column('books_table', 'Image',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               existing_nullable=True)
    op.alter_column('books_table', 'Category',
               existing_type=sa.TEXT(),
               type_=sa.String(),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('books_table', 'Category',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               existing_nullable=True)
    op.alter_column('books_table', 'Image',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               existing_nullable=True)
    op.alter_column('books_table', 'Link',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               existing_nullable=True)
    op.alter_column('books_table', 'Author',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               existing_nullable=True)
    op.alter_column('books_table', 'Title',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               existing_nullable=True)
    op.alter_column('books_table', 'ID',
               existing_type=sa.String(),
               type_=sa.TEXT(),
               nullable=True)
    op.drop_column('books_table', 'updated_at')
    op.drop_column('books_table', 'created_at')
    # ### end Alembic commands ###
