"""empty message

Revision ID: 76ec6a976316
Revises: 5a80511adadb
Create Date: 2023-12-11 22:08:24.148670

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '76ec6a976316'
down_revision = '5a80511adadb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pet', schema=None) as batch_op:
        batch_op.create_unique_constraint(None, ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pet', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')

    # ### end Alembic commands ###
