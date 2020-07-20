import os
import logging

logger = logging.getLogger()
logger.setLevel(os.environ['LOG_LEVEL'])


def cdk_test_Lambda_handler(event, context):
    logger.info('[START] cdk_test_Lambda_handler')

    res = cdk_test_Lambda(event)

    logger.info('[END] cdk_test_Lambda_handler')
    return res


def cdk_test_Lambda(event):
    logger.info('[START] cdk_test_Lambda')

    logger.debug('Hallo World 11!!')

    logger.info('[END] cdk_test_Lambda')

    return True
